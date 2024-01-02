from django.urls import path
from . import views

urlpatterns = [
    # authenticate
    path('auth/csrf', views.csrf),
    path('auth/login', views.login_view),
    path('auth/user', views.user_view),

    # Product
    path('products/', views.products),
    path('products/<int:product_id>', views.product_detail),

    # Product > Review
    path('products/<int:product_id>/reviews', views.reviews),
    path('products/<int:product_id>/reviews/<int:review_id>', views.review_detail),
]
