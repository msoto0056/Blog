from rest_framework import routers
from django.urls import path,re_path, reverse
from .views import PromotionViewSet, PromotionsListView

app_name = 'promotions'

router = routers.DefaultRouter()
router.register('',PromotionViewSet, basename='promotion')
# router.register('',ProductImageViewSet,basename='productsImages')
urlpatterns = router.urls


urlpatterns += [
    path('',PromotionsListView.as_view(),name='promotions'),

]

