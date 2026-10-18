import 'package:flutter/material.dart';
import 'features/delivery/domain/pod_validator.dart';
import 'services/offline_service.dart';

class MostaqlDriverApp extends StatelessWidget {
  const MostaqlDriverApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mostaql Driver - مندوب مستقل',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          primary: const Color(0xFF2563EB),
        ),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      home: const DriverHomeScreen(),
    );
  }
}

class DriverHomeScreen extends StatefulWidget {
  const DriverHomeScreen({super.key});

  @override
  State<DriverHomeScreen> createState() => _DriverHomeScreenState();
}

class _DriverHomeScreenState extends State<DriverHomeScreen> {
  final PodValidator _podValidator = PodValidator();
  final OfflineService _offlineService = OfflineService();

  bool _isOnline = true;
  double _currentCodBalance = 430.0;
  final double _maxCodLimit = 2000.0;

  final List<Map<String, dynamic>> _todayShipments = [
    {
      'id': 'shp_101',
      'tracking': 'TRK-982341',
      'recipient': 'أحمد المنصور',
      'address': 'الرياض - حي العليا',
      'lat': 24.7136,
      'lng': 46.6753,
      'codAmount': 180.0,
      'status': 'in_transit',
    },
    {
      'id': 'shp_102',
      'tracking': 'TRK-982342',
      'recipient': 'خالد حسن',
      'address': 'الرياض - حي الملز',
      'lat': 24.6645,
      'lng': 46.7328,
      'codAmount': 250.0,
      'status': 'in_transit',
    },
  ];

  void _confirmDelivery(Map<String, dynamic> shipment) {
    // Assume mock driver position close to target for demo
    const driverLat = 24.7135;
    const driverLng = 46.6752;

    final isWithin = _podValidator.isWithinGeofence(
      driverLat: driverLat,
      driverLng: driverLng,
      destLat: shipment['lat'] as double,
      destLng: shipment['lng'] as double,
    );

    if (!isWithin) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('⚠️ تنبيه: أنت خارج نطاق موقع المستلم (Geofence)! لا يمكنك إغلاق الشحنة.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    // Save action offline
    _offlineService.enqueuePendingAction({
      'id': shipment['id'],
      'action': 'DELIVERED',
      'codCollected': shipment['codAmount'],
    });

    setState(() {
      shipment['status'] = 'delivered';
      _currentCodBalance += shipment['codAmount'] as double;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('✅ تم إثبات تسليم الشحنة ${shipment['tracking']} بنجاح!'),
        backgroundColor: Colors.green,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF0F172A),
          title: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('تطبيق المندوب - مستقل', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              Text('المسار اليومي المعتمد', style: TextStyle(color: Colors.white70, fontSize: 12)),
            ],
          ),
          actions: [
            Row(
              children: [
                Text(_isOnline ? 'متصل' : 'غير متصل', style: const TextStyle(color: Colors.white, fontSize: 13)),
                Switch(
                  value: _isOnline,
                  activeColor: Colors.greenAccent,
                  onChanged: (val) => setState(() => _isOnline = val),
                ),
              ],
            )
          ],
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // COD Balance Card
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                color: _currentCodBalance > _maxCodLimit ? Colors.red.shade50 : Colors.blue.shade50,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('العهد الكاش الحالية (COD)', style: TextStyle(color: Colors.black87, fontSize: 13)),
                          const SizedBox(height: 4),
                          Text('${_currentCodBalance.toStringAsFixed(1)} ر.س', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          Text('الحد المسموح به: ${_maxCodLimit.toStringAsFixed(0)} ر.س', style: TextStyle(fontSize: 12, color: Colors.grey.shade700)),
                        ],
                      ),
                      ElevatedButton(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('يرجى التوجه للسوبرفايزر لتسليم النقدية.')),
                          );
                        },
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0F172A)),
                        child: const Text('تسوية الآن', style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),
              const Text('شحنات اليوم التسلسلية (Optimized Route)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              const SizedBox(height: 12),

              // Shipments List
              ..._todayShipments.map((shp) {
                final isDelivered = shp['status'] == 'delivered';
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(16),
                    leading: CircleAvatar(
                      backgroundColor: isDelivered ? Colors.green.shade100 : Colors.blue.shade100,
                      child: Icon(
                        isDelivered ? Icons.check_circle : Icons.local_shipping,
                        color: isDelivered ? Colors.green : Colors.blue,
                      ),
                    ),
                    title: Text('${shp['tracking']} - ${shp['recipient']}', style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 4),
                        Text(shp['address'] as String),
                        const SizedBox(height: 4),
                        Text('المبلغ عند الاستلام: ${shp['codAmount']} ر.س', style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.w600)),
                      ],
                    ),
                    trailing: isDelivered
                        ? const Chip(label: Text('تم التسليم', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)))
                        : ElevatedButton(
                            onPressed: () => _confirmDelivery(shp),
                            child: const Text('إثبات التسليم'),
                          ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
