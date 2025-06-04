import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const { fechaHora, estadoBiciclo, fotografia, observacion, idBiciclo } = Object.fromEntries(formData.entries());

  try {
    const novedad = await supabase
      .from('Novedad')
      .insert([
        { FechaHoraNovedad: fechaHora, EstadoBiciclo: Boolean(estadoBiciclo), Imagen: fotografia, Observacion: observacion },
      ])
      .select('NroNovedad')
    if (novedad.error) throw novedad.error
    const { data, error } = await supabase
      .from('Registro')
      .insert([
        { Biciclo: idBiciclo, Novedad: novedad.data[0].NroNovedad, Administrador: 1 },
      ])
    if (error) throw error;
    return redirect("/");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};