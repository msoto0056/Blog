import random
import os
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.db.models import Q
from django.urls import reverse
from django.core.validators import MaxValueValidator, MinValueValidator

from .utils import unique_slug_generator

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = random.randint(1,3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "products/{new_filename}/{final_filename}".format(
            new_filename=new_filename, 
            final_filename=final_filename
            )

def upload_to(instance, filename):
    return 'products/{filename}'.format(filename=filename)

class ProductCategories(models.Model):
    
    class Meta:
        verbose_name_plural='Categories'
    
    category  = models.CharField(max_length=120)
    image     = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.category
    
class ProductQuerySet(models.query.QuerySet):
    def active(self):
        return self.filter(active=True)

    def featured(self):
        return self.filter(featured=True, active=True)
    
    def search(self, query):
        lookups = (Q(title__icontains=query) | 
                  Q(description__icontains=query) |
                  Q(price__icontains=query)|
                  Q(tag__title__icontains=query))
        return self.filter(lookups).distinct()

class ProductManager(models.Manager):
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def all(self):
        return self.get_queryset().active()

    def featured(self): #Product.objects.featured() 
        return self.get_queryset().featured()

    def get_by_id(self, id):
        qs = self.get_queryset().filter(id=id) # Product.objects == self.get_queryset()
        if qs.count() == 1:
            return qs.first()
        return None

    def search(self, query):
        return self.get_queryset().active().search(query)


class Product(models.Model):

    class ProductObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
    
    category        = models.ForeignKey(ProductCategories, on_delete=models.CASCADE, related_name='products')
    title           = models.CharField(max_length=120)
    slug            = models.SlugField(blank=True, unique=True)
    description     = models.TextField()
    price           = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    cost            = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    qty             = models.DecimalField(decimal_places=2, max_digits=20, default=1)
    image           = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    featured        = models.BooleanField(default=False)
    active          = models.BooleanField(default=True)
    video           = models.FileField(upload_to=upload_image_path, null=True, blank=True)
    rating          = models.DecimalField(decimal_places=2, max_digits=4, default=2.5, validators=[MaxValueValidator(5), MinValueValidator(0)])
    timestamp       = models.DateTimeField(auto_now_add=True)
    upload          = models.FileField(upload_to=upload_to, null=True, blank=True)


    objects = ProductManager()
    Products = ProductObjects()

    def get_absolute_url(self):
        return "/products/{slug}/".format(slug=self.slug)

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title

    @property
    def name(self):
        return self.title

def product_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.image:
        instance.image = 'Default.jpeg'

    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(product_pre_save_receiver, sender=Product)

class ProductImages(models.Model):
    
    class Meta:
        verbose_name_plural='Photograhs'
    
    product  = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE, related_name='productImages')
    pictures = models.ImageField(upload_to=upload_image_path, null=True, blank=True)



