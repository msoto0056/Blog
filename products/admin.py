from django.contrib import admin

from .models import Product, ProductImages, ProductCategories

class ProductImageInline(admin.TabularInline):
    model=ProductImages


class ProductAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'slug','qty']
    class Meta:
        model = Product
        
    inlines= [
        ProductImageInline,
    ] 
class ProductCategory(admin.ModelAdmin):
    list_display = ['id','__str__']
    class Meta:
        model = ProductCategories

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategories, ProductCategory)



