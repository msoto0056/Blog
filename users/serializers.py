from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True) # valida el password lenght y no permite crear new user si es menor a 8 

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password','first_name','last_name','idiom','is_staff','is_active')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password', 'first_name', 'last_name','idiom','is_staff','is_active' )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        userInfo = [{
            "email":user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "idiom": user.idiom,
            "is_active": user.is_active,
            "is_staff": user.is_staff,
        }]

        # Add custom claims
        token['userInfo']= userInfo
        # ...

        return token