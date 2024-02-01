from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User
from .models import Product, ProductReview

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
        fields = '__all__'  # Możesz również wylistować wszystkie pola, które chcesz zawrzeć, dodając 'user_name'

    def get_user_name(self, obj):
        return obj.user.username if obj.user else None

class ProductSerializer(ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        
