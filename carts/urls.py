from django.urls import path,re_path, reverse

from .views import (
        cart_home, 
        cart_update, 
        checkout_home,
        checkout_done_view,
        cart_detail_api_view
        )

app_name = 'carts'
urlpatterns = [
    path('cart/', cart_home, name='home'),
    path('cart/update/', cart_update, name='update'),
    path('cart/checkout/', checkout_home, name='checkout'),
    path('cart/checkout/success/', checkout_done_view, name='success'),
    path('api/cart/', cart_detail_api_view, name='api'),
]

