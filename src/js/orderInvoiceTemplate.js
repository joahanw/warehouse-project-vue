const formatRupiah = (amount) => `Rp ${amount.toLocaleString("id-ID")}`;

/**
 * Build the "Selesaikan Pembayaran" order invoice HTML (QRIS), matching the
 * BakedByErina email template, filled in with real transaction data.
 */
export const buildOrderInvoiceHtml = (data) => {
  const subTotalAmount = data.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const shippingAmount = parseInt(data.shippingCost) || 0;
  const grandTotalAmount = subTotalAmount + shippingAmount;

  const expiryDate = new Date(
    new Date(data.timestamp).getTime() + 15 * 60 * 1000,
  );
  const expiryTime = `${expiryDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  })} WIB`;

  const itemsHtml = data.products
    .map(
      (item) => `
                                        <tr>
                                            <td style="padding:12px 18px;
                                                       border-bottom:1px solid #eff4ff;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="vertical-align:top;">
                                                            <p style="margin:0;font-size:13px;
                                                                      font-weight:500;color:#0d1c2f;">
                                                                ${item.productName}
                                                            </p>
                                                            <p style="margin:3px 0 0;font-size:11px;color:#505f76;">
                                                                Kuantitas: ${item.quantity}
                                                            </p>
                                                        </td>
                                                        <td align="right" style="vertical-align:top;
                                                                                 white-space:nowrap;
                                                                                 padding-left:8px;">
                                                            <p style="margin:0;font-size:13px;
                                                                      font-weight:500;color:#0d1c2f;">
                                                                ${formatRupiah(item.price * item.quantity)}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Selesaikan Pembayaran</title>
    <style type="text/css">
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            outline: none;
            text-decoration: none;
        }
        @media screen and (max-width: 480px) {
            .email-wrapper { padding: 12px 0 !important; }
            .email-card   { width: 100% !important; border-radius: 0 !important; border-left: none !important; border-right: none !important; }
            .header-td    { padding: 0 20px !important; }
            .logo-text    { font-size: 15px !important; }
            .order-badge  { padding: 5px 10px !important; }
            .order-label  { font-size: 9px !important; }
            .order-value  { font-size: 11px !important; }
            .hero-td      { padding: 28px 20px 20px !important; }
            .hero-title   { font-size: 22px !important; }
            .hero-sub     { font-size: 14px !important; }
            .body-td      { padding: 20px !important; }
            .col-left     { display: block !important; width: 100% !important; padding-right: 0 !important; padding-bottom: 16px !important; }
            .col-right    { display: block !important; width: 100% !important; padding-left: 0 !important; }
            .footer-td    { padding: 16px 20px !important; }
        }
        @media screen and (min-width: 481px) and (max-width: 620px) {
            .email-card   { width: 95% !important; }
            .header-td    { padding: 0 28px !important; }
            .hero-td      { padding: 32px 28px 20px !important; }
            .body-td      { padding: 24px 28px !important; }
            .hero-title   { font-size: 24px !important; }
        }
        .header-logo,.header-order{}
        @media screen and (max-width:480px){
            .header-logo,.header-order{
                display:block!important;
                width:100%!important;
                text-align:center!important;
            }
            .header-order{
                padding-top:0!important;
                padding-bottom:20px!important;
            }
            .header-order table,
            .order-table{
                margin:0 auto!important;
                float:none!important;
            }
            .qr-image{
                width:220px!important;
                max-width:100%!important;
                height:auto!important;
            }
        }
    </style>
</head>
<body style="margin:0;padding:0;background:#f8f9ff;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" class="email-wrapper"
       style="background:#f8f9ff;padding:32px 0;">
    <tr>
        <td align="center">
            <table width="620" cellpadding="0" cellspacing="0" class="email-card"
                   style="background:#ffffff;border-radius:12px;border:1px solid #c4c6cd;overflow:hidden;">

                <tr>
                    <td class="header-td" style="background:#041627;padding:0 40px;">
                        <table role="presentation" style="border-collapse:collapse;" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="header-logo" style="padding:18px 0;vertical-align:middle;">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="padding-right:8px;vertical-align:middle;font-size:22px;line-height:1;">
                                                🥐
                                            </td>
                                            <td style="vertical-align:middle;">
                                                <p class="logo-text"
                                                   style="margin:0;font-size:17px;font-weight:700;
                                                          color:#ffffff;letter-spacing:0.3px;
                                                          white-space:nowrap;">
                                                    BakedByErina.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="header-order" align="right" style="padding:18px 0;vertical-align:middle;">
                                    <table class="order-table" cellpadding="0" cellspacing="0" align="right">
                                        <tr>
                                            <td class="order-badge"
                                                style="background:rgba(255,255,255,0.08);
                                                       border:1px solid rgba(255,255,255,0.15);
                                                       border-radius:6px;padding:6px 14px;">
                                                <p class="order-label"
                                                   style="margin:0 0 2px;font-size:9px;font-weight:600;
                                                          letter-spacing:1.5px;text-transform:uppercase;
                                                          color:rgba(255,255,255,0.5);">
                                                    ID Pesanan
                                                </p>
                                                <p class="order-value"
                                                   style="margin:0;font-size:12px;font-weight:600;
                                                          color:#ffffff;letter-spacing:0.3px;
                                                          word-break:break-all;">
                                                    ${data.order_id}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td class="hero-td"
                        style="padding:36px 40px 24px;text-align:center;border-bottom:1px solid #e8eaed;">
                        <h1 class="hero-title"
                            style="margin:0 0 8px;font-size:26px;font-weight:700;
                                   color:#041627;letter-spacing:-0.5px;">
                            Terima Kasih, ${data.name}.
                        </h1>
                        <p class="hero-sub"
                           style="margin:0;font-size:15px;color:#505f76;line-height:1.6;">
                            Pesanan Anda telah diterima dan sedang menunggu pembayaran.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td class="body-td" style="padding:28px 40px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr valign="top">

                                <td class="col-left"
                                    width="52%"
                                    style="padding-right:16px;vertical-align:top;">

                                    <table width="100%" cellpadding="0" cellspacing="0"
                                           style="border:1px solid #c4c6cd;border-radius:8px;
                                                  margin-bottom:16px;">
                                        <tr>
                                            <td style="padding:14px 18px 12px;
                                                       border-bottom:1px solid #c4c6cd;">
                                                <p style="margin:0;font-size:10px;font-weight:600;
                                                          letter-spacing:1.5px;text-transform:uppercase;
                                                          color:#505f76;">
                                                    Ringkasan Pesanan
                                                </p>
                                            </td>
                                        </tr>
                                        ${itemsHtml}
                                        <tr>
                                            <td style="padding:14px 18px;background:#eff4ff;
                                                       border-radius:0 0 8px 8px;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="padding:3px 0;">
                                                            <span style="font-size:12px;color:#505f76;">
                                                                Subtotal
                                                            </span>
                                                        </td>
                                                        <td align="right" style="padding:3px 0;
                                                                                 white-space:nowrap;">
                                                            <span style="font-size:12px;color:#0d1c2f;">
                                                                ${formatRupiah(subTotalAmount)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:3px 0;">
                                                            <span style="font-size:12px;color:#505f76;">
                                                                Pengiriman
                                                            </span>
                                                        </td>
                                                        <td align="right" style="padding:3px 0;
                                                                                 white-space:nowrap;">
                                                            <span style="font-size:12px;color:#0d1c2f;">
                                                                ${formatRupiah(shippingAmount)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top:10px;
                                                                   border-top:1px solid #c4c6cd;">
                                                            <span style="font-size:13px;font-weight:700;
                                                                         color:#041627;">
                                                                Total Pembayaran
                                                            </span>
                                                        </td>
                                                        <td align="right"
                                                            style="padding-top:10px;
                                                                   border-top:1px solid #c4c6cd;
                                                                   white-space:nowrap;">
                                                            <span style="font-size:13px;font-weight:700;
                                                                         color:#041627;">
                                                                ${formatRupiah(grandTotalAmount)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>

                                    <table width="100%" cellpadding="0" cellspacing="0"
                                           style="border:1px solid #c4c6cd;border-radius:8px;">
                                        <tr>
                                            <td style="padding:14px 18px 12px;
                                                       border-bottom:1px solid #c4c6cd;">
                                                <p style="margin:0;font-size:10px;font-weight:600;
                                                          letter-spacing:1.5px;text-transform:uppercase;
                                                          color:#505f76;">
                                                    Alamat Pengiriman
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:14px 18px;">
                                                <p style="margin:0;font-size:13px;color:#505f76;
                                                          font-style:italic;line-height:1.7;">
                                                    ${data.address}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>

                                <td class="col-right"
                                    width="48%"
                                    style="padding-left:16px;vertical-align:top;">
                                    <table width="100%" cellpadding="0" cellspacing="0"
                                           style="border:2px solid #041627;border-radius:8px;">
                                        <tr>
                                            <td style="padding:20px;text-align:center;">

                                                <p style="margin:0 0 4px;font-size:17px;
                                                          font-weight:700;color:#041627;">
                                                    Pembayaran via QRIS
                                                </p>
                                                <p style="margin:0 0 14px;font-size:9px;font-weight:600;
                                                          letter-spacing:1px;text-transform:uppercase;
                                                          color:#505f76;">
                                                    Scan untuk menyelesaikan pesanan
                                                </p>

                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                       style="border:1px solid #c4c6cd;border-radius:6px;
                                                              margin-bottom:14px;">
                                                    <tr>
                                                        <td style="padding:10px;text-align:center;
                                                                   background:#fafafa;">
                                                            <img class="qr-image" src="${data.payment_token}"
                                                                 alt="QR Code Pembayaran"
                                                                 width="160" height="160"
                                                                 style="display:block;margin:0 auto;
                                                                        max-width:100%;height:auto;"/>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                       style="margin-bottom:14px;text-align:left;">
                                                    <tr>
                                                        <td style="padding:3px 0;">
                                                            <table cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td style="padding-right:6px;color:#22c55e;
                                                                               font-size:13px;vertical-align:top;
                                                                               padding-top:1px;">
                                                                        &#10003;
                                                                    </td>
                                                                    <td style="font-size:11px;color:#44474c;
                                                                               line-height:1.5;">
                                                                        Buka aplikasi m-banking atau e-wallet Anda.
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:3px 0;">
                                                            <table cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td style="padding-right:6px;color:#22c55e;
                                                                               font-size:13px;vertical-align:top;
                                                                               padding-top:1px;">
                                                                        &#10003;
                                                                    </td>
                                                                    <td style="font-size:11px;color:#44474c;
                                                                               line-height:1.5;">
                                                                        Pilih menu "Scan" atau "QRIS".
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:3px 0;">
                                                            <table cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td style="padding-right:6px;color:#22c55e;
                                                                               font-size:13px;vertical-align:top;
                                                                               padding-top:1px;">
                                                                        &#10003;
                                                                    </td>
                                                                    <td style="font-size:11px;color:#44474c;
                                                                               line-height:1.5;">
                                                                        Pastikan nominal sesuai dengan Total Pembayaran.
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <p style="margin:0;font-size:11px;color:#74777d;">
                                                    Berlaku hingga:
                                                    <strong style="color:#ba1a1a;">
                                                        ${expiryTime}
                                                    </strong>
                                                </p>

                                            </td>
                                        </tr>
                                    </table>
                                </td>

                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td class="footer-td"
                        style="padding:20px 40px;background:#eff4ff;
                               border-top:1px solid #c4c6cd;text-align:center;">
                        <p style="margin:0;font-size:12px;color:#74777d;">
                            BakedByErina. &middot; Semua hak dilindungi
                        </p>
                        <p style="margin:6px 0 0;font-size:12px;color:#74777d;">
                            Jika Anda tidak merasa melakukan transaksi ini, abaikan email ini.
                        </p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>`;
};
