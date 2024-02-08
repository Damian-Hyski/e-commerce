from django.db import models
from django.utils.html import mark_safe
from django.contrib.auth.models import User
from django.utils.text import slugify

RATING = (
    (1, '★☆☆☆☆'),
    (2, '★★☆☆☆'),
    (3, '★★★☆☆'),
    (4, '★★★★☆'),
    (5, '★★★★★'),
)

BINDING = (
    ('miekka', 'Miękka'),
    ('twarda', 'Twarda')
)

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)

def custom_slugify(value):
    # Mapowanie polskich znaków na łacińskie
    polish_map = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
        'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
    }
    for pol, lat in polish_map.items():
        value = value.replace(pol, lat)
    return slugify(value)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Użytkownik')

    title = models.CharField(max_length=255, verbose_name='Nazwa produktu')
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    book_image = models.ImageField(upload_to=user_directory_path, default='product.jpg', verbose_name='Okładka książki')
    author = models.CharField(max_length=255, verbose_name='Autor')
    publisher = models.CharField(max_length=255, verbose_name='Wydawca')
    publication_date = models.DateField(verbose_name="Data Wydania")
    pages = models.IntegerField(verbose_name='Strony')
    binding = models.CharField(choices=BINDING, default='miekka', max_length=255, verbose_name='Oprawa')
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
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = custom_slugify(self.title)
        super().save(*args, **kwargs)
    
    def product_image(self):
        return mark_safe('<img src ="%s" width="50" height="auto" />' % (self.book_image.url))

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Użytkownik')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Produkt', related_name='reviews')
    review = models.TextField(verbose_name='Recenzja')
    rating = models.IntegerField(choices=RATING, default=None, verbose_name='Ocena')
    date = models.DateTimeField(auto_now_add=True, verbose_name='Data')






PAYMENT_METHOD = (
    ('card', 'Karta'),
    ('blik', 'Blik'),
    ('p24', 'Przelewy 24'),
    ('paypal', 'PayPal'),
)

DEVILERY_METHOD = (
    ('inpost', 'InPost'),
    ('poczta', 'Poczta Polska'),
)

STATUS_CHOICE = (
    ('process', 'Przetwarzanie'),
    ('shipped', 'Wysłany'),
    ('devilered', 'Dostarczony'),
)

class CartOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Użytkownik')
    payment_id = models.CharField(max_length=255, null=True, blank=True, verbose_name='ID Zamówienia')
    order_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=255, choices=PAYMENT_METHOD, verbose_name='Metoda Płatności')
    delivery_method = models.CharField(max_length=255, choices=DEVILERY_METHOD, verbose_name='Metoda Dostawy')
    payment_status = models.BooleanField(default=False, verbose_name='Opłacone')
    products = models.ManyToManyField(Product, through='CartOrderItems', verbose_name='Lista Produktów')
    status = models.CharField(max_length=10, choices=STATUS_CHOICE, default='process', verbose_name='Status')
    

    class Meta:
        verbose_name_plural = 'Zamówienia'

    def get_products(self):
        products = CartOrderItems.objects.filter(order=self)
        product_info = [f"{item.product.title} ({item.quantity} szt.)" for item in products]
        return ", ".join(product_info)
    
    def get_products_id(self):
        products = CartOrderItems.objects.filter(order=self)
        id = [item.product.pid for item in products]
        return "".join(id)


class CartOrderItems(models.Model):
    order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Lista Produktów')
    quantity = models.PositiveIntegerField(verbose_name='Ilość Produktów')

    class Meta:
        verbose_name_plural = 'Lista Produktów'
        
    def get_total_cost(self, obj):
        total_cost = sum(item.product.current_price * item.quantity for item in obj.cartorderitems_set.all())
        return f"{total_cost:.2f} zł"


    def __str__(self):
        return f"{self.quantity} x {self.product.title} in Order {self.order.id}"
    
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, verbose_name='Imię i Nazwisko')
    email = models.EmailField(verbose_name='Email')
    address = models.CharField(max_length=255, verbose_name='Adres')
    zip_code = models.CharField(max_length=10, verbose_name='Kod Pocztowy')
    city = models.CharField(max_length=255, verbose_name='Miasto')
    cart_order = models.ForeignKey(CartOrder, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True, verbose_name='Koszyk')

    class Meta:
        verbose_name_plural = 'Adres Dostawy'