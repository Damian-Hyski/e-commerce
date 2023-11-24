from rest_framework.serializers import ModelSerializer
from .models import Product, ProductReview

class ProductReviewSerializer(ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        
