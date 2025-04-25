import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Caffè Latte',
      size: 'Medium',
      price: 4.99,
      quantity: 2,
      image: 'https://placehold.co/100x100'
    },
    {
      id: 2,
      name: 'Espresso',
      size: 'Small',
      price: 2.99,
      quantity: 1,
      image: 'https://placehold.co/100x100'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartList}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSize}>{item.size}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.quantityButton}>
                <Ionicons name="remove" size={20} color="#6B7280" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton}>
                <Ionicons name="add" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryAmount}>$12.97</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tax</Text>
          <Text style={styles.summaryAmount}>$1.30</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>$14.27</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemSize: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    color: '#1F2937',
  },
  summary: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryAmount: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  checkoutButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;