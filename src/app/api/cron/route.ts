import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // ใช้ .upsert เพื่ออัปเดตแถวเดิม (id: 1) เสมอ
    // วิธีนี้จะสร้าง Activity จริง แต่ Table จะมีแค่ 1 row ตลอดไป
    const { error } = await supabase
      .from("keep_alive")
      .upsert({ id: 1, created_at: new Date() });

    if (error) throw error;

    return NextResponse.json({ message: "Keep-alive successful" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
