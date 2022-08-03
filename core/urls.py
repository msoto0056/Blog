from django.contrib import admin
from django.urls import path, include,re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenBlacklistView
from users.views import MyTokenObtainPairView
from rest_framework.schemas import get_schema_view
#from rest_framework.documentation import include_docs_urls
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blog/', include('blog_api.urls', namespace='blog_api')),
    path('api/user/',include('users.urls',namespace='users')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('api/docs/',include_docs_urls(title='BlogApi')),
    path('openapi', get_schema_view(
        title="BlogApi",
        description="Blogs API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),
    # path('swagger-ui/', TemplateView.as_view(
    #     template_name='swagger-ui.html',
    #     extra_context={'schema_url': 'openapi-schema'}
    # ), name='swagger-ui'),
    path('', include('blog.urls', namespace='blog')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# enable this line to add the React code inside this project. 
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]