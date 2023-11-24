from django.db import models
from django.contrib.auth.models import User

RATING = (
    (1, '★☆☆☆☆'),
    (2, '★★☆☆☆'),
    (3, '★★★☆☆'),
    (4, '★★★★☆'),
    (5, '★★★★★'),
)

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nazwa produktu')
    description = models.TextField(verbose_name='Opis produktu')
    current_price = models.DecimalField(max_digits=9999, decimal_places=2, verbose_name='Obecna cena')
    old_price = models.DecimalField(max_digits=9999, decimal_places=2, null=True, blank=True, verbose_name='Stara cena')
    in_stock = models.BooleanField(default=True, verbose_name='Dostępny')
    quantity_in_stock = models.IntegerField(verbose_name='Ilość sztuk w magazynie')
    status = models.BooleanField(default=False, verbose_name='Opublikuj')

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Użytkownik')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Produkt', related_name='reviews')
    review = models.TextField(verbose_name='Recenzja')
    rating = models.IntegerField(choices=RATING, default=None, verbose_name='Ocena')
    date = models.DateTimeField(auto_now_add=True, verbose_name='Data')