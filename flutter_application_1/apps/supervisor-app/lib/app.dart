import 'package:flutter/material.dart';

class MostaqlSupervisorApp extends StatelessWidget {
  const MostaqlSupervisorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mostaql Supervisor - المشرف',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F172A),
          primary: const Color(0xFF0F172A),
        ),
        useMaterial3: true,
      ),
      home: const SupervisorHomeScreen(),
    );
  }
}

class SupervisorHomeScreen extends StatefulWidget {
  const SupervisorHomeScreen({super.key});

  @override
  State<SupervisorHomeScreen> createState() => _SupervisorHomeScreenState();
}

class _SupervisorHomeScreenState extends State<SupervisorHomeScreen> {
  int _receivedCount = 42;
  int _dispatchedCount = 38;

  final TextEditingController _barcodeController = TextEditingController();

  void _scanBarcode() {
    if (_barcodeController.text.isEmpty) return;
    setState(() {
      _receivedCount++;
      _barcodeController.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('✅ تم استلام الشحنة وتخزينها بالمركز بنجاح!'),
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
          title: const Text('تطبيق المشرف - مركز الفرز والفرز', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // KPI Cards
              Row(
                children: [
                  Expanded(
                    child: Card(
                      color: Colors.blue.shade50,
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          children: [
                            const Text('المستلم اليوم من الشركات', style: TextStyle(fontSize: 12, color: Colors.black87)),
                            const SizedBox(height: 6),
                            Text('$_receivedCount شحنة', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Card(
                      color: Colors.green.shade50,
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          children: [
                            const Text('المُسَلَّم للمناديب', style: TextStyle(fontSize: 12, color: Colors.black87)),
                            const SizedBox(height: 6),
                            Text('$_dispatchedCount شحنة', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.green)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 24),
              const Text('مسح الباركود لاستلام شحنة جديدة', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _barcodeController,
                      decoration: const InputDecoration(
                        hintText: 'أدخل أو امسح رقم الشحنة TRK-...',
                        border: OutlineInputBorder(),
                        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: _scanBarcode,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.all(16),
                      backgroundColor: const Color(0xFF0F172A),
                    ),
                    child: const Icon(Icons.qr_code_scanner, color: Colors.white),
                  ),
                ],
              ),

              const SizedBox(height: 28),
              const Text('تسوية عهد المناديب النقذية (COD Settlement)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),

              Card(
                child: ListTile(
                  title: const Text('أحمد المنصور (مندوب)', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('العهد المعلقة: 430.0 ر.س (3 شحنات)'),
                  trailing: ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('✅ تم تأكيد استلام 430.0 ر.س كاش وتسوية الحساب بنجاح!'), backgroundColor: Colors.green),
                      );
                    },
                    child: const Text('استلام الكاش'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
