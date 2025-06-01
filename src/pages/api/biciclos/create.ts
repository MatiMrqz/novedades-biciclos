import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request,redirect }) => {
  const formData = await request.formData();
  const { codigoCuadro, cupi, marca, modelo, color, tipo, observacion } = Object.fromEntries(formData.entries());

  try {
    const bici = await supabase
      .from('Biciclo')
      .insert([
        { CodigoCuadro: codigoCuadro, CUPI: cupi, Marca: marca, Modelo: modelo, Color: color, Tipo: tipo, Observacion: observacion },
      ]) 
      .select()
    if (bici.error) throw bici.error
    return redirect("/biciclos");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};