from django.shortcuts import render
from rest_framework import generics, viewsets
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    DjangoModelPermissionsOrAnonReadOnly,
    BasePermission,
    SAFE_METHODS,
)
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.utils.translation import gettext_lazy as _
from products.models import Product, ProductCategories
from .serializers import ProductSerializer, ProductCategoriesSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser


class PostFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    # max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = {
            'title':['exact', 'icontains'], 
            'description': ['icontains'], 
            'slug': ['exact', 'icontains'],
            # 'price': 
        }

class ProductViewSet(viewsets.ModelViewSet):  # This approach abstract even more but less control
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter
    parser_classes = [MultiPartParser, FormParser]
    #queryset = Post.objects.all()

    def get_queryset(self):
        query = self.request.query_params.get('slug', None)
        if query is not None:
            return Product.objects.filter(slug=query)
        else:
            query = self.request.query_params.get('id', None)
            if query is not None:
                return Product.objects.filter(id=query)
        return Product.objects.all()   
    
    @action(detail=False, methods=['get'])
    def filtered(self, request):
        category_ids = request.query_params.getlist('categories')
        queryset = self.filter_queryset(self.get_queryset())

        if category_ids:
            queryset = queryset.filter(category__in=category_ids)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ProductCategoriesViewSet(viewsets.ModelViewSet):
    queryset = ProductCategories.objects.all()
    serializer_class = ProductCategoriesSerializer

# class ProductImageViewSet(viewsets.ModelViewSet):
#     permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#     serializer_class = ProductImageSerializer
    
#     def get_queryset(self):
#         query = self.request.query_params.get('id', None)
#         if query is not None:
#             return ProductImages.objects.filter(id=query)
#         return None


# class CreatePost(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request, format=None):
#         print(request.data)
#         serializer = PostSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

