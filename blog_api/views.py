from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated, 
    IsAdminUser, 
    DjangoModelPermissionsOrAnonReadOnly,
    BasePermission,
    SAFE_METHODS,
)
from blog.models import Post
from .serializers import PostSerializer
from django.utils.translation import gettext_lazy as _


class PostUserClassPermissions(BasePermission):
    message=_('Edit and Delete are restricted to the author only')
    def has_object_permission(self, request,view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

class PostList(generics.ListCreateAPIView):
    # queryset= Post.objects.all() # qs with all Post Objects
    # qs with all Post Objects flaged as 'published'
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserClassPermissions):
    permission_classes = [PostUserClassPermissions]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
