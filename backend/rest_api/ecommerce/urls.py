from django.urls import path
from . import views

urlpatterns = [
    # CSRF Token
    path('auth/csrf', views.csrf),

    # authenticate

    path('auth/register', views.register_view),
    path('auth/login', views.login_view),
    path('auth/status', views.check_login_status),
    path('auth/logout', views.logout_view),
    path('auth/user', views.user_view),

    # Product
    path('products/', views.products),
    path('products/<slug:slug>', views.product_detail),

    # Product > Review
    path('products/<slug:slug>/reviews', views.reviews),
    path('products/<slug:slug>/reviews/<int:review_id>', views.review_detail),

    # Stripe
    path('create-order/', views.create_order, name='create-order'),
    path('webhook/', views.webhook, name='webhook'),
]
