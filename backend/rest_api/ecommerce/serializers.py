from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User
from .models import Product, ProductReview, CartOrderItems, Address, CartOrder

class RegistrationUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id' ,'username']

class ProductReviewSerializer(ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = ProductReview
        fields = '__all__'

    def get_user_name(self, obj):
        return obj.user.username if obj.user else None

class ProductSerializer(ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        





class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderItems
        fields = ['product', 'quantity']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['name', 'email', 'address', 'zip_code', 'city']

class CartOrderSerializer(serializers.ModelSerializer):
    cart = serializers.ListField(write_only=True, child=serializers.JSONField())
    address = AddressSerializer(write_only=True)

    class Meta:
        model = CartOrder
        fields = ['user', 'payment_id', 'payment_method', 'delivery_method', 'status', 'cart', 'address']
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart')
        address_data = validated_data.pop('address')
        user = self.context['request'].user

        order = CartOrder.objects.create(**validated_data, user=user)

        address_data['user'] = user
        Address.objects.create(**address_data, cart_order=order)  # Ustawienie instancji `CartOrder` w `Address`

        for item_data in cart_items_data:
            product_id = item_data.get('id')
            quantity = item_data.get('quantity')
            product = Product.objects.get(id=product_id)
            CartOrderItems.objects.create(order=order, product=product, quantity=quantity)

        return order

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        address_instance = instance.addresses.first()  # Użycie `addresses` z `related_name`
        if address_instance:
            address_representation = AddressSerializer(address_instance).data
            representation['address'] = address_representation
        return representation