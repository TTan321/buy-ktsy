from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    users = db.relationship('User', back_populates = 'cart')
    products = db.relationship('Product', back_populates="carts")


    def to_dict_cart(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "quantity": self.quantity,
        }

    def to_dict_cart_rel(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "quantity": self.quantity,
          "users": self.users.to_dict()
        }
