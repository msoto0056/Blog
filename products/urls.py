'''
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
'''

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,re_path, reverse
from .views import (
    ProductListView,
    product_list_view,
    ProductDetailView, 
    ProductDetailSlugView,
    ProductFeaturedListView,
)

app_name = 'products'
urlpatterns = [
    path('products/',ProductListView.as_view(),name='product'),
    path('productsf/',ProductFeaturedListView.as_view(),name='productf'),
    path('products/<int:pk>/',ProductDetailView.as_view(),name='detail'),
    path('products/<slug:slug>/',ProductDetailSlugView.as_view(),name='details'),
    re_path('products-fbv/',product_list_view)
]