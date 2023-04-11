from django.urls import path
from django.views.generic import TemplateView
from .views import BlogListView

app_name='blog'

urlpatterns = [
    path('blog/',BlogListView.as_view(), name='list'),
    path('blog/<int:id>/', BlogListView.as_view(), name='detail'),
    path('blog/<str:pk>/', BlogListView.as_view(), name='detail'),
]
