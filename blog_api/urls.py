from rest_framework import routers
from .views import PostViewSet

app_name = 'blog_api'

router = routers.DefaultRouter()
router.register('',PostViewSet,'posts')
urlpatterns = router.urls


# replace with routers

# urlpatterns = [
#    path('<int:pk>/',PostDetail.as_view(), name='detail'),
#    path('<str:pk>/',PostDetail.as_view(), name='detail'),
#    path('',PostList.as_view(),name='list'),

# ]
