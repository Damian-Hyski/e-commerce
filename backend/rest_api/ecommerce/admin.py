from django.contrib import admin
from .models import Product, ProductReview

class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_image', 'title', 'current_price', 'in_stock', 'quantity_in_stock', 'status']

class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'rating', 'date']

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductReview, ProductReviewAdmin)
