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
from .serializers import PromotionSerializer
from .models import Promotions



# Create your views here.

class PromotionViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PromotionSerializer
    queryset = Promotions.objects.all()

class PromotionsListView(ListView):
    model= Promotions
    template_name = 'products/promotions_list.html'
    queryset = Promotions.objects.all
    context = {
        'object_list': queryset
    }
