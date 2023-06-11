from rest_framework import routers
from django.urls import path,re_path, reverse
from .views import CategoriesViewSet, CategoriesListView

app_name = 'category_api'

router = routers.DefaultRouter()
router.register('',CategoriesViewSet, basename='categories')
urlpatterns = router.urls


urlpatterns += [
    path('',CategoriesListView.as_view(),name='category_api'),

]
