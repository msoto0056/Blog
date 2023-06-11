from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    DjangoModelPermissionsOrAnonReadOnly,
    BasePermission,
    SAFE_METHODS,
)
from django.views.generic import ListView, DetailView
from .serializers import CategoriesSerializer
from products.models import ProductCategories

class CategoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = CategoriesSerializer
    queryset = ProductCategories.objects.all()

class CategoriesListView(ListView):
    model= ProductCategories
    template_name = 'products/categories_list.html'
    queryset = ProductCategories.objects.all
    context = {
        'object_list': queryset
    }

