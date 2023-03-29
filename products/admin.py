from django.contrib import admin

from .models import Product, ProductImages

class ProductImageInline(admin.TabularInline):
    model=ProductImages


class ProductAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'slug']
    class Meta:
        model = Product
        
    inlines= [
        ProductImageInline,
    ] 
admin.site.register(Product, ProductAdmin)
# admin.site.register(ProductImages)


