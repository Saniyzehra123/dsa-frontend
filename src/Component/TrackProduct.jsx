import React from 'react';

const TrackProduct = () => {
    const orderId = 'DSA-25603';
    const orderDate = '15th Oct 2024';
    const currentStatus = 'Cancelled';

    const styles = {
        container: {
            margin: '20px auto',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
            fontFamily: 'Arial, sans-serif',
            marginTop:'250px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '20px',
        },
        headerText: {
            fontSize: '16px',
            color: '#333',
            fontWeight: 'bold',
        },
        statusContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '20px',
        },
        statusText: {
            fontSize: '16px',
            color: '#333',
            fontWeight: 'bold',
        },
        statusLabel: {
            color: 'orange',
            fontWeight: 'bold',
        },
        cancelButton: {
            padding: '8px 20px',
            border: 'none',
            backgroundColor: '#ccc',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'default',
            fontSize: '16px',
        },
        productCard: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px 20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
        },
        productImage: {
            width: '80px',
            height: 'auto',
            marginRight: '15px',
            borderRadius: '5px',
        },
        productInfo: {
            flex: 1,
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header - Order Details */}
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <p>Order Placed</p>
                    <p>{orderDate}</p>
                </div>
                <div style={styles.headerText}>
                    <p>Order ID</p>
                    <p>{orderId}</p>
                </div>
            </div>

            {/* Track Your Deliveries Heading */}
            <h3 style={{ paddingLeft: '20px', fontSize: '18px', color: '#333' }}>Track your Deliveries</h3>

            {/* Current Status Card */}
            <div style={styles.statusContainer}>
                <p style={styles.statusText}>
                    Current Status: <span style={styles.statusLabel}>{currentStatus}</span>
                </p>
                <button style={styles.cancelButton}>{currentStatus}</button>
            </div>

            {/* Product Details Card */}
            <div style={styles.productCard}>
                <img 
                    src="https://dsafashionwear.com/images/DSA_01/DSA_01.jpg" 
                    alt="Palkon Ki Leher" 
                    style={styles.productImage} 
                />
                <div style={styles.productInfo}>
                    <p>Katan Silk With Silver Zari Work</p>
                </div>
            </div>
        </div>
    );
};

export default TrackProduct;
