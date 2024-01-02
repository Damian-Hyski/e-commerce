from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Product, ProductReview

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class ProductReviewSerializer(ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        
