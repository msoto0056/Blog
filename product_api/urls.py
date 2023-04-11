from rest_framework import routers
from .views import ProductViewSet

app_name = 'product_api'

router = routers.DefaultRouter()
router.register('',ProductViewSet,basename='product ')
# router.register('',ProductImageViewSet,basename='productsImages')
urlpatterns = router.urls


