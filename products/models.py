import random
import os
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.db.models import Q
from django.urls import reverse


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
    title           = models.CharField(max_length=120)
    slug            = models.SlugField(blank=True, unique=True)
    description     = models.TextField()
    price           = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    cost            = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    image           = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    featured        = models.BooleanField(default=False)
    active          = models.BooleanField(default=True)
    photo           = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo1          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo2          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo3          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo4          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo5          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo6          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo7          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo8          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    photo9          = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    video           = models.FileField(upload_to=upload_image_path, null=True, blank=True)
    timestamp       = models.DateTimeField(auto_now_add=True)
    upload          = models.FileField(upload_to='uploads/', null=True, blank=True)


    objects = ProductManager()

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
        instance.image = instance.photo

    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(product_pre_save_receiver, sender=Product)