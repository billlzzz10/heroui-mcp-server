# HeroUI MCP Server Agent Plan

## สร้าง server layer จริงใน src/server/
- จัดโครงสร้าง server รองรับ HTTP/WebSocket หรือ MCP protocol
- เชื่อมต่อ tool registry และ session manager เพื่อให้เรียกใช้เครื่องมือได้อย่างปลอดภัย
- กำหนด interface สำหรับรับคำสั่งจาก client และส่งผลลัพธ์กลับอย่างเป็นระบบ

## ปรับ crud.update ให้รองรับ partial nested updates
- ใช้กลไก deep merge หรือฟังก์ชัน callback ในการอัปเดต object
- ป้องกันการลบข้อมูล metadata เดิมโดยไม่ได้ตั้งใจ
- เพิ่ม unit test ครอบคลุมกรณี nested fields

## เพิ่ม validation ชั้นกลางก่อนเรียก tool
- ตรวจสอบ input ด้วย inputSchema ก่อนส่งให้ method execute
- จัดการ error และตอบกลับ message ที่อ่านง่ายเมื่อ validation ล้มเหลว
- บันทึกข้อมูลการเรียกใช้งานเพื่อเพิ่ม traceability

## ขั้นตอนถัดไป
- ทดสอบเรียกใช้ HTTP endpoints ใหม่ด้วย curl หรือ Postman เพื่อยืนยันการทำงาน end-to-end
- เพิ่ม integration tests สำหรับ HTTP layer ด้วยการ mock/request server เพื่อป้องกัน regression
- ตรวจสอบไฟล์ placeholder tools ให้ปรับใช้สคีมาจริงที่สอดคล้องกับ objects\nรายงานโดย: codex - 2024-09-27

