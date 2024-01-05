from django.urls import path
from . import views

urlpatterns = [
    # CSRF Token
    path('auth/csrf', views.csrf),

    # authenticate
    path('auth/login', views.login_view),
    path('auth/status', views.check_login_status),
    path('auth/logout', views.logout_view),
    path('auth/user', views.user_view),

    # Product
    path('products/', views.products),
    path('products/<int:product_id>', views.product_detail),

    # Product > Review
    path('products/<int:product_id>/reviews', views.reviews),
    path('products/<int:product_id>/reviews/<int:review_id>', views.review_detail),
]
