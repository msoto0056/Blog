from rest_framework import serializers
from products.models import  ProductCategories


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model= ProductCategories
        fields = ('__all__')

