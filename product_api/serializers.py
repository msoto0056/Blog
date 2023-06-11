from rest_framework import serializers
from products.models import Product, ProductImages, ProductCategories
from django.conf import settings
from django.urls import reverse
from django.http import HttpRequest

class ProductImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields =['pictures']


class ProductSerializer(serializers.ModelSerializer):
    productImages = ProductImageSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = ('id','title','image','slug','description','price','cost','qty','upload','active','rating','productImages')
        depth=1 
    
    @staticmethod
    def filter_categories(queryset, category_ids):
        # Filter the queryset based on category IDs
        return queryset.filter(category__in=category_ids)

    # Old def ... Delete if the new one works. 
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
        
    #     # Include additional fields or data manipulation as needed
        
    #     return representation


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Format the image URL consistently
        image_url = instance.image.url if instance.image else None
        if image_url and not image_url.startswith(('http://', 'https://')):
            request = self.context.get('request')
            if request:
                image_url = request.build_absolute_uri(image_url)
            else:
                # If request object is not available, construct the URL manually
                if isinstance(request, HttpRequest):
                    scheme = request.scheme
                    host = request.get_host()
                else:
                    scheme = 'http'
                    host = 'localhost:8000'
                
                image_url = f'{scheme}://{host}{image_url}'
        
        representation['image'] = image_url

        return representation


class ProductCategoriesSerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)
    products = serializers.SerializerMethodField()

    class Meta:
        model = ProductCategories
        fields = ('id', 'category', 'image', 'products')

    # Added Code for allowing all products of all categories
    def get_products(self, instance):
        category_id = self.context.get('category_id')
        if category_id:
            queryset = Product.objects.filter(category_id=category_id)
        else:
            queryset = instance.products.all()

        serializer = ProductSerializer(queryset, many=True)
        products_data = serializer.data

        # Modify productImages array to include absolute URLs
        for product in products_data:
            product_images = product.pop('productImages', [])
            product['productImages'] = [
                {'pictures': self.context['request'].build_absolute_uri(image['pictures'])}
                for image in product_images
            ]

        return products_data
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['image'] = instance.image.url if instance.image else None
        return representation