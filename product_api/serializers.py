from rest_framework import serializers
from products.models import Product, ProductImages


class ProductImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields =['pictures']


class ProductSerializer(serializers.ModelSerializer):
    productImages = ProductImageSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = ('id','title','image','slug','description','price','cost','upload','active','rating','productImages')
        depth=1 
