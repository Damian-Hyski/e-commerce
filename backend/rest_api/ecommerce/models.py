from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nazwa produktu')
    description = models.TextField(verbose_name='Opis produktu')

    current_price = models.DecimalField(max_digits=9999, decimal_places=2, verbose_name='Obecna cena')
    old_price = models.DecimalField(max_digits=9999, decimal_places=2, null=True, blank=True, verbose_name='Stara cena')


    in_stock = models.BooleanField(default=True, verbose_name='Dostępny')
    quantity_in_stock = models.IntegerField(verbose_name='Ilość sztuk w magazynie')

    status = models.BooleanField(default=False, verbose_name='Opublikuj')