from rest_framework import generics, viewsets
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    DjangoModelPermissionsOrAnonReadOnly,
    BasePermission,
    SAFE_METHODS,
)
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from blog.models import Post
from .serializers import PostSerializer


class PostUserWritePermission(BasePermission):
    message = _('Edit and Delete are restricted to the author only')

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class PostUserClassPermissions(BasePermission):
    message = _('Edit and Delete are restricted to the author only')

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class PostFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    # max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Post
        fields = {
            'category':['exact'],
            'title':['exact', 'icontains'], 
            'author':['exact'],
            'excerpt': ['icontains'], 
            'content': ['icontains'], 
            'slug': ['exact', 'icontains']
        }



class PostViewSet(viewsets.ModelViewSet):  # This approach abstract even more but less control
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter


    def get_queryset(self):
        query = self.request.query_params.get('slug', None)
        if query is not None:
            return Post.objects.filter(slug=query)
        else:
            query = self.request.query_params.get('id', None)
            if query is not None:
                return Post.objects.filter(id=query)
        return Post.objects.all()
    


    # def get_object(self, queryset=None, *args, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(Post, slug=item)

    # # Define Custom Queryset
    # def get_queryset(self):
    #     return Post.objects.all()

# class PostList(viewsets.ViewSet):   # This approach give control to everything and we select what to do
#     permission_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()

#     def list(self, request):
#         serializer_class = PostSerializer (self.queryset, many=True)
#         return Response(serializer_class.data)

#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)

    # All possible options below

    # def list(self, request):
    #     pass

    # def create(self, request):
    #     pass

    # def retrieve(self, request, pk=None):
    #     pass

    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass


# Clases for Views replace above with viewset

# class PostList(generics.ListCreateAPIView):
#     # queryset= Post.objects.all() # qs with all Post Objects
#     # qs with all Post Objects flaged as 'published'
#     permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#     queryset = Post.postobjects.all()
#     serializer_class = PostSerializer


# class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserClassPermissions):
#     permission_classes = [PostUserClassPermissions]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

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
