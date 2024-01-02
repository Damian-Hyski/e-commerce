from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
    path('products/', views.products),
    path('products/<int:product_id>', views.product_detail),
    path('products/<int:product_id>/reviews', views.reviews),
    path('products/<int:product_id>/reviews/<int:review_id>', views.review_detail),
]
