from rest_framework import serializers
from products.models import Product, ProductImages, ProductCategories


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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Include additional fields or data manipulation as needed
        
        return representation

class ProductCategoriesSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ProductCategories
        fields = ('id', 'category', 'image', 'products')

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Include additional fields or data manipulation as needed
        representation['image'] = instance.image.url if instance.image else None

        return representation