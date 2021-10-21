from django.urls import path
from django.views.generic import TemplateView

app_name='blog'

urlpatterns = [
    path('',TemplateView.as_view(template_name='blog/index.html')),
    path('<int:id>/', TemplateView.as_view(template_name='blog/index.html'), name='detail'),
    path('<str:pk>/', TemplateView.as_view(template_name='blog/index.html'), name='detail'),
]
