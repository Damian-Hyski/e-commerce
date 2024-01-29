from django.db import models
from django.utils.html import mark_safe
from django.contrib.auth.models import User

RATING = (
    (1, '★☆☆☆☆'),
    (2, '★★☆☆☆'),
    (3, '★★★☆☆'),
    (4, '★★★★☆'),
    (5, '★★★★★'),
)

BINDING = (
    (1, 'Miękka'),
    (2, 'Twarda')
)

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Użytkownik')

    name = models.CharField(max_length=255, verbose_name='Nazwa produktu')
    book_image = models.ImageField(upload_to=user_directory_path, default='product.jpg', verbose_name='Okładka książki')
    author = models.CharField(max_length=255, verbose_name='Autor')
    publisher = models.CharField(max_length=255, verbose_name='Wydawca')
    publication_date = models.DateField(verbose_name="Data Wydania")
    pages = models.IntegerField(verbose_name='Strony')
    binding = models.IntegerField(choices=BINDING, default=None, verbose_name='Oprawa')
    release_date = models.DateField(verbose_name="Data Premiery")
    description = models.TextField(verbose_name='Opis produktu')
    current_price = models.DecimalField(max_digits=9999, decimal_places=2, verbose_name='Obecna cena')
    old_price = models.DecimalField(max_digits=9999, decimal_places=2, null=True, blank=True, verbose_name='Stara cena')
    in_stock = models.BooleanField(default=True, verbose_name='Dostępny')
    quantity_in_stock = models.IntegerField(verbose_name='Ilość sztuk w magazynie')
    status = models.BooleanField(default=False, verbose_name='Opublikuj')

    class Meta:
        verbose_name_plural = 'Książki'

    def __str__(self):
        return self.name
    
    def product_image(self):
        return mark_safe('<img src ="%s" width="50" height="auto" />' % (self.book_image.url))

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Użytkownik')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Produkt', related_name='reviews')
    review = models.TextField(verbose_name='Recenzja')
    rating = models.IntegerField(choices=RATING, default=None, verbose_name='Ocena')
    date = models.DateTimeField(auto_now_add=True, verbose_name='Data')