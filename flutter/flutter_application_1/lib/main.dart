import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text('Minimalistic Radial Gauge'),
          backgroundColor: Colors.black87,
        ),
        body: Center(
          child: SizedBox(
            width: 300,
            height: 300,
            child: RadialGaugeWidget(
              value: 85,
              min: 0,
              max: 100,

            ),
          ),
        ),
      ),
    );
  }
}

class RadialGaugeWidget extends StatelessWidget {
  final double value;
  final double min;
  final double max;
  final String label;

  const RadialGaugeWidget({
    super.key,
    this.value = 50,
    this.min = 0,
    this.max = 100,
    this.label = '',
  });

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: <RadialAxis>[
        RadialAxis(
          startAngle: 150,
          endAngle: 30,
          minimum: min,
          maximum: max,
          showTicks: false,
          showLabels: false,
          axisLineStyle: AxisLineStyle(
            thickness: 0.1,
            thicknessUnit: GaugeSizeUnit.factor,
            color: Colors.grey.shade300,
            cornerStyle: CornerStyle.bothFlat,
          ),
          ranges: <GaugeRange>[
            GaugeRange(
              startValue: min,
              endValue: max,
              startWidth: 20,
              endWidth: 20,
              gradient: SweepGradient(
                colors: [
                  Colors.red.shade400,
                  Colors.yellow.shade400,
                  Colors.green,
                ],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ],
          pointers: <GaugePointer>[
            NeedlePointer(
              value: value,
              needleColor: Colors.black,
              needleLength: 0.9,
              needleStartWidth: 1,
              needleEndWidth: 8,
              knobStyle: KnobStyle(
                knobRadius: 0.12,
                color: Colors.black,
                borderColor: Colors.white,
                borderWidth: 0.06,
              ),
              enableAnimation: true,
              animationDuration: 1000,
              tailStyle: TailStyle(
                width: 0,
                length: 0,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
