from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

senha = input("Digite a senha: ")
hash_gerado = pwd_context.hash(senha)

print("\nHash gerado:")
print(hash_gerado)