from rest_framework import routers
from .views import ProductViewSet, ProductCategoriesViewSet

app_name = 'product_api'

router = routers.DefaultRouter()
router.register('',ProductViewSet,basename='product ')
router.register('categories', ProductCategoriesViewSet)
# router.register('',ProductImageViewSet,basename='productsImages')
urlpatterns = router.urls


