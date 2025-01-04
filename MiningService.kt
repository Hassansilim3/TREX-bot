package com.example.cryptominer

import android.app.Service
import android.content.Intent
import android.os.Handler
import android.os.IBinder
import android.content.Context
import android.widget.Toast

class MiningService : Service() {

    private val handler = Handler()
    private var points = 0

    private val miningRunnable = object : Runnable {
        override fun run() {
            points++
            savePoints(points)
            Toast.makeText(applicationContext, "نقاط التجميع: $points", Toast.LENGTH_SHORT).show()
            handler.postDelayed(this, 1000) // يجدد العملية