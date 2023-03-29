from django.contrib import admin

# Register your models here.

from .models import Cart
from products.models import Product

class CartProductInline(admin.TabularInline):
    model = Cart.products.through

# class ProductInline(admin.TabularInline):
    # model=Product

class CartAdmin(admin.ModelAdmin):
    list_display = ['__str__']
    class Meta:
        model = Cart
        
    inlines= [
        CartProductInline,
    ] 
    exclude = ('products',)

admin.site.register(Cart, CartAdmin)

