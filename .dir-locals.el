((nil . ((fill-column . 110)
         (eval . (progn
                   (use-package nl-angular
                     :after typescript-mode
                     :load-path "~/.emacs.d/lisp"
                     :init
                     (require 'tide))
                   (setq dumb-jump-default-project (projectile-project-root)))))))
