<?php $wrapper_attributes = get_block_wrapper_attributes(['class' => 'AccordionItem']); ?>

<div <?= $wrapper_attributes; ?>>
  <h3 class="AccordionItem__heading">
    <button class="AccordionItem__toggle" aria-expanded="false"><?= $attributes['heading']; ?></button>
  </h3>
  <div class="AccordionItem__content">
    <div class="AccordionItem__interior">
      <?= $content; ?>
    </div>
  </div>
</div>
