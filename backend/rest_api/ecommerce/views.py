from django.shortcuts import render
import stripe
from django.conf import settings
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Product, CartOrder
from .serializers import ProductSerializer, ProductReviewSerializer, UserSerializer, RegistrationUserSerializer, CartOrderSerializer
import logging
import os


# CSRF Token
@api_view(['GET'])
def csrf(request):
    response = Response()
    response.set_cookie('csrftoken', get_token(request))
    return response




# Authenticate
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def register_view(request):
    serializer = RegistrationUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_protect
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Pomyślnie zalogowano'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Nieprawidłowe dane logowania'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def check_login_status(request):
    if request.user.is_authenticated:
        # Użytkownik jest zalogowany
        return Response({'status': True}, status=status.HTTP_200_OK)
    
    # Użytkownik nie jest zalogowany
    return Response({'status': False}, status=status.HTTP_200_OK)

@api_view(['GET'])
@login_required
def user_view(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@csrf_protect
def logout_view(request):
    logout(request)
    return Response({'message': 'Pomyślnie wylogowano'}, status=status.HTTP_200_OK)




# Product
@api_view(['GET', 'POST'])
def products(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, slug):
    try:
        product = Product.objects.get(slug=slug)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Product > Review
@api_view(['GET', 'POST'])
def reviews(request, slug):
    try:
        product = Product.objects.get(slug=slug)
        reviews = product.reviews.all()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ProductReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, slug, review_id):
    try:
        product = Product.objects.get(slug=slug)
        review = product.reviews.get(id=review_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ProductReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



# Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY
STRIPE_ENDPOINT_SECRED = os.getenv('STRIPE_ENDPOINT_SECRED')
endpoint_secret = STRIPE_ENDPOINT_SECRED

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    logger.info(f"Request user: {request.user}")
    serializer = CartOrderSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        order = serializer.save()

        price = order.get_total_cost()
        price_in_cents = int(price * 100)

        try:
            payment_method = request.data['payment_method']
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=[payment_method],
                line_items=[{
                    'price_data': {
                        'currency': 'pln',
                        'unit_amount': price_in_cents,
                        'product_data': {'name': 'Zamówienie'},
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url='http://127.0.0.1:3000/payment-success/' + str(order.id),
                cancel_url='http://127.0.0.1:3000/payment-canceled',
            )

            order.payment_id = checkout_session['id']
            order.save()

            return Response({'url': checkout_session.url}, status=201)
        except Exception as e:
            logger.error('Błąd płatności Stripe: %s', e)
            # Możesz zdecydować, co zrobić w przypadku niepowodzenia płatności (np. usunąć zamówienie, zarejestrować błąd itp.)
            return Response({'error': str(e)}, status=400)
    else:
        logger.error('Błędy walidacji: %s', serializer.errors)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def webhook(request):
    payload = request.body.decode('utf-8')
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Nieprawidłowe dane
        return Response(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Nieprawidłowy podpis
        return Response(status=400)

    # Obsługa zdarzeń webhooka
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Aktualizuj status zamówienia w bazie danych
        try:
            order = CartOrder.objects.get(payment_id=session.id)
            order.payment_status = True
            # order.status = 'shipped'  # lub inny odpowiedni status
            order.save()
        except CartOrder.DoesNotExist:
            logger.error(f"Nie znaleziono zamówienia z payment_id {session.id}")
            return Response(status=400)

    return Response(status=200)