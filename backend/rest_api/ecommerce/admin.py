from django.contrib import admin
from .models import Product, ProductReview, CartOrderItems, Address, CartOrder

class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_image', 'title', 'current_price', 'in_stock', 'quantity_in_stock', 'status']

class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'rating', 'date']

class CartOrderItemsInline(admin.TabularInline):
    model = CartOrderItems
    extra = 0

class AddressInline(admin.TabularInline):
    model = Address
    extra = 0

class CartOrderAdmin(admin.ModelAdmin):
    list_display = ('payment_id', CartOrder.get_products, 'get_total_cost', 'payment_status', 'status')

    inlines = [CartOrderItemsInline, AddressInline]

    def get_total_cost(self, obj):
        total_cost = sum(item.product.current_price * item.quantity for item in obj.cartorderitems_set.all())
        return f"{total_cost:.2f} zł"
    get_total_cost.short_description = 'Koszt'

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductReview, ProductReviewAdmin)
admin.site.register(CartOrder, CartOrderAdmin)
